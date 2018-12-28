<template>
    <div class="login" @keyup.enter="submit">
        <p class="title">{{$base.config.systemTitle}}</p>
        <div class="login-box">
            <p class="welcome">欢迎登录</p>
            <div class="left">
                <div class="allipse">
                  <p class="allipse-above"></p>
                  <img class="computer" src="~Assets/login/computer.png">
                </div>
            </div>
            <div class="right">
                <p class="input-box user">
                    <input class="input" v-model="form.account" type="text" placeholder="输入用户名">
                </p>
                <p class="input-box password">
                    <input class="input" type="password" v-model="form.password" placeholder="请输入密码">
                </p>
                <!-- <a href="" class="forget">忘记密码?</a> -->
                <button class="submit" @click="submit">
                    <Icon class="icon" v-show="loading" type="ios-loading" size=18></Icon>
                    <span class="txt">登录</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// import md5 from 'md5'
import axios from 'axios'
// 登录页面
export default {
  data () {
    return {
      loading: false,
      form: {
        account: '',
        password: ''
        // captcha: '1234'
      }
    }
  },
  methods: {
    submit () {
      if (this.form.account && this.form.password) {
        this.loading = true
        axios({
          method: 'post',
          url: 'http://39.108.52.40:8002/monitor-login/user/login',
          isFormData: true,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: this.form
        }).then(result => {
          console.log('result', result)
          if (parseInt(result.status) === 200) {
            this.$base.config.userId = result.data.data
            this.$base.config.username = this.form.account

            localStorage.setItem('systemUserId', result.data.data)
            localStorage.setItem('systemUserName', this.form.account)
            setTimeout(() => {
              this.loading = false
              this.$router.push(this.$route.query.url || this.$base.config.firstLink)
            }, 1000)
          } else {
            this.error(result.data.message)
          }
        }).catch(error => {
          this.error(error)
        })
      } else {
        this.$Notice.error({
          title: '请填写账号与密码！'
        })
      }
    }
    // error (error) {
    //   this.loading = false
    //   this.$Notice.error({
    //     name: 'logout',
    //     title: error,
    //     duration: 2
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
::-webkit-input-placeholder { /* WebKit browsers */
    color:    #fff;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #fff;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #fff;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #fff;
}
.login{
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background: url('~Assets/login/bg.png') no-repeat;
    .title{
        font-size: 30px;
        line-height: 30px;
        color: #ffffff;
        text-align: center;
        padding-top: 120px;
        transition: all ease 1s;
    }
    .login-box{
        width: 625px;
        height: 375px;
        margin: 160px auto 0;
        transition: all ease 1s;
        background: url('~Assets/login/login_bg.png') no-repeat;
        .welcome{
            position: relative;
            top: -14px;
            left: 80px;
            width: 174px;
            height: 66px;
            color: #ffffff;
            font-size: 18px;
            line-height: 46px;
            text-align: center;
            background: url('~Assets/login/lbg.png') no-repeat;
        }
        .left{
            float: left;
            width: 250px;
            height: 100%;
            .allipse{
                position: relative;
                top: 90px;
                left: 52px;
                width: 180px;
                height: 92px;
                background: linear-gradient(#98deff66, #0383a266);
                border-radius: 50%;
                box-shadow: 0 2px 6px 0 rgba(0,0,0,0.28);
                .allipse-above{
                    position: relative;
                    top: -5px;
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    transform: scale(0.83);
                    background: linear-gradient(#98deff66, #0383a266);
                    border-radius: 50%;
                    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.28);
                }
                .computer{
                    position: relative;
                    top: -153px;
                    left: 25px;
                    z-index: 2;
                }
            }
        }
        .right{
            float: left;
            width: 240px;
            margin-top: 15px;
            .input-box{
                position: relative;
                margin-top: 10px;
                .input{
                    color: #ffffff;
                    width: 240px;
                    height: 40px;
                    padding: 10px 10px 10px 40px;
                    background: none;
                    border: none;
                    border-bottom: 1px solid #000;
                    outline: none;
                }
                &:before{
                    content: '';
                    z-index: 1;
                    top: 11px;
                    left: 11px;
                    position: absolute;
                    display: inline-block;
                    width: 18px;
                }
                &.user:before{
                    height: 18px;
                    background: url('~Assets/login/user.png') no-repeat;
                }
                &.password:before{
                    height: 21px;
                    background: url('~Assets/login/password.png') no-repeat;
                }
            }
            .forget{
                float: right;
                margin-top: 32px;
                color: #c8c8c8;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                text-decoration: underline;
            }
            .submit{
                width: 240px;
                height: 45px;
                margin-top: 70px;
                background: #0b283c;
                border: none;
                border-radius: 5px;
                outline: none;
                cursor: pointer;
                .txt{
                    color: #fff;
                    font-size: 16px;
                    line-height: 45px;
                    letter-spacing: 20px;
                    margin-left: 10px;
                }
                .icon{
                    animation: ani-demo-spin 1s linear infinite;
                }
                &:after{
                    content: '';
                    z-index: 1;
                    top: -35px;
                    left: -11px;
                    position: relative;
                    display: inline-block;
                    width: 262px;
                    height: 67px;
                    background: url('~Assets/login/shadow.png') no-repeat;
                }
            }
        }
    }
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
@media screen and (max-width: 1366px) {
    .login{
        .title{
            padding-top: 80px;
        }
        .login-box{
            margin: 70px auto 0;
        }
    }
}
</style>
