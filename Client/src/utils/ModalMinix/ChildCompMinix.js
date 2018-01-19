import { MaskManage } from './ElementHandle'

export default {
  name: 'modal-mixin',
  props: {
    'value': {
      type: Boolean,
      default: false
    },
    'useMask': {
      type: Boolean,
      default: true
    },
    'closeOnClickMask': {
      type: Boolean,
      default: true
    }
  },
  beforeDestroy () {
    if (MaskManage.maskList.length > 0) {
      let curMask = MaskManage.maskList.pop()
      MaskManage.closeMask(curMask.id)
    }
    MaskManage.maskObj = {}
    MaskManage.maskList = []
  },
  watch: {
    value (val, oldVal) {
      if (val) {
        this.open()
      } else {
        this.close()
      }
    }
  },
  methods: {
    open () {
      if (this.useMask) {
        this.$emit('input', true)
        let id = 'mask_' + MaskManage.maskId++
        MaskManage.registe(id, this)
        MaskManage.openMask(id)
      }
    },
    close () {
      if ((this.useMask && this.closeOnClickMask)) {
        this.$emit('input', false)
        // 如果是点击遮罩层关闭，此时this.value还是true，正常情况下应该先改变value
        if (this.value) {
          return
        }
        let curMask = MaskManage.maskList.pop()
        MaskManage.unregiste(curMask.id)
        MaskManage.closeMask(curMask.id)
      }
    }
  },
  mounted () {
    if (this.value) {
      this.open()
    }
  }
}
