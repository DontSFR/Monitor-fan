import Scrollbar from 'smooth-scrollbar'

export default {
  data () {
    return {
      treeLoading: false
    }
  },
  methods: {
    initScroll () {
      this.$nextTick(() => {
        Scrollbar.init(document.querySelector('#J_aside_tree'))
      })
    },
    async queryTreeData () {
      this.treeLoading = true
      let data = await this.$ajax({
        method: 'get',
        url: ''
      })

      this.treeData[0].children = this.renderTreeData(data.data)
      this.treeLoading = false
    },
    renderTreeData (data) {
      return data.map(t => {
        return {
          ...t,
          expand: true,
          selected: t.id === this.treeId,
          title: t.categoryName,
          children: (t.childrens && t.childrens.length) ? this.renderTreeData(t.childrens) : []
        }
      })
    }
  }
}
