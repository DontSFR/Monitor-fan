<template>
    <Form
        ref="myCommonForninline"
        :model="forms"
        :rules="ruleValidate"
        :label-width="model.labelWidth?model.labelWidth:90"
        class="my-common-form">
        <Row>
            <slot name="otherItemsPrefix"></slot>
            <Col v-for="t in model.data" :key="t.model" :span="t.span" :offset="t.offset">
                <!-- type='placeholder'为占位的col -->
                <p v-if="t.type==='placeholder'" style="min-height: 57px;">&nbsp;</p>
                <FormItem v-else :label="t.label" :prop="t.model">
                    <div v-if="t.type=='input'">
                        <Input
                            v-if="t.inputType=='text'"
                            :type="t.inputType"
                            v-model="forms[t.model]"
                            :disabled="t.disabled"
                            :placeholder="t.placeholder" />
                        <Input
                            v-if="t.inputType=='password'"
                            :type="t.inputType"
                            v-model="forms[t.model]"
                            :placeholder="t.placeholder" />
                        <Input
                            v-if="t.inputType=='email'"
                            :type="t.inputType"
                            v-model="forms[t.model]"
                            :placeholder="t.placeholder" />
                        <Input
                            v-if="t.inputType=='url'"
                            :type="t.inputType"
                            v-model="forms[t.model]"
                            :placeholder="t.placeholder" />
                    </div>
                    <Input
                        v-if="t.type=='textarea'"
                        v-model="forms[t.model]"
                        type="textarea"
                        :autosize="{minRows: t.minRows||2,maxRows: t.maxRows||5}"
                        :placeholder="t.placeholder" />
                    <InputNumber
                        v-if="t.type=='number'"
                        :max="t.maxLimit||9999999"
                        :min="t.minLimit||0"
                        :precision="t.precision"
                        :placeholder="t.placeholder"
                        v-model="forms[t.model]"
                        style="width:100%"
                        :disabled="t.disabled"
                        @on-change="(val)=>{t.onChange&&t.onChange(val)}"
                    ></InputNumber>
                    <Select v-if="t.type=='select'" v-model="forms[t.model]" :filterable="t.filterable" :placeholder="t.placeholder">
                        <Option v-if="!t.nullOpt||(t.nullOpt&&!t.nullOpt.hide)" value="">{{(t.nullOpt?t.nullOpt.text:'')||'全部'}}</Option>
                        <Option v-for="tt in t.values"
                            :value="tt[t.sendType||'code']||tt.id"
                            :key="tt.id">{{tt.name}}</Option>
                    </Select>
                    <Cascader v-if="t.type=='cascader'" :data="t.values" v-model="forms[t.model]"></Cascader>
                    <area-cascader v-if="t.type=='areacascader'" v-model="forms[t.model]"></area-cascader>
                    <DatePicker
                        v-if="t.type=='datepicker'"
                        :type="t.dateType"
                        :options="t.options"
                        :placeholder="t.placeholder"
                        style="width:100%"
                        v-model="forms[t.model]"></DatePicker>
                    <TimePicker
                        v-if="t.type=='timepicker'"
                        :type="t.dateType"
                        :format="t.format"
                        :placeholder="t.placeholder"
                        style="width:100%"
                        v-model='forms[t.model]'></TimePicker>
                    <RadioGroup v-if="t.type=='radio'" v-model="forms[t.model]">
                        <Radio v-for="tt in t.values"
                            :label="tt[t.sendType||'code']||tt.id"
                            :key="tt.id">{{tt.name}}</Radio>
                    </RadioGroup>
                    <CheckboxGroup v-if="t.type=='check'" v-model="forms[t.model]">
                        <Button style="margin-right:10px;" shape="circle" type="primary" size="small" v-if="t.hasCheckAll"
                            @click.prevent.native="handleCheckAll(forms,t)">全选</Button>
                        <Checkbox v-for="tt in t.values"
                            :label="tt[t.sendType||'code']||tt.id"
                            :key="tt.id">{{tt.name}}</Checkbox>
                    </CheckboxGroup>
                    <i-switch v-if="t.type=='switch'" v-model="forms[t.model]"
                        :size="t.size||'large'">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                    <img-upload v-if="t.type=='uploadImg'" v-model="forms[t.model]"></img-upload>
                    <scenic-remote v-if="t.type=='scenicRemote'" v-model="forms[t.model]"></scenic-remote>
                       <scenic-spot v-if="t.type=='scenicSpot'" v-model="forms[t.model]"></scenic-spot>
                    <vue-html5-editors v-if="t.type=='vueEditor'" :content="forms[t.model]" @change="t.changeContent"></vue-html5-editors>
                </FormItem>
            </Col>
            <slot name="otherItems"></slot>
            <slot name="btns"></slot>
        </Row>
    </Form>
</template>

<script>
export default {
  name: 'commonForm',
  props: {
    model: {
      type: Object,
      default () {
        return {
          labelWidth: 90,
          data: []
        }
      }
    },
    forms: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.$on('resetCommonForm', function () {
      this.$refs.myCommonForninline.resetFields()
    })
  },
  computed: {
    ruleValidate () {
      let obj = {}
      this.model.data.forEach(t => {
        obj[t.model] = []
        if (t.required) {
          obj[t.model] = obj[t.model].concat([{ required: true, message: '必填项不能为空', trigger: 'blur', type: t.validateType || 'string' }])
        }
        if (t.max > 0) {
          obj[t.model] = obj[t.model].concat([{ max: t.max, message: `长度不超过${t.max}个字`, trigger: 'change' }])
        }
        if (t.rules && t.rules.length) {
          obj[t.model] = obj[t.model].concat(t.rules)
        }
      })
      return obj
    }
  },
  data () {
    return {}
  },
  methods: {
    handleCheckAll (forms, item) {
      if (forms[item.model].length >= 0 && forms[item.model].length < item.values.length) {
        forms[item.model] = item.values.map(t => {
          return t[item.sendType || 'code'] || t.id
        })
      } else {
        forms[item.model] = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-common-form /deep/{
    .ivu-row{
        &:before,
        &:after{
            display:inline-block;
        }
    }
}
</style>
