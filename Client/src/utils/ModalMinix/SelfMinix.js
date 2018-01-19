import { MaskManage } from './ElementHandle'

export default {
  name: 'modal-mixin',
  data () {
    return {
      showMask: false,
      useMask: true,
      closeOnClickMask: true
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
  methods: {
    open () {
      if (this.useMask) {
        this.showMask = true
        let id = 'mask_' + MaskManage.maskId++
        MaskManage.registe(id, this)
        MaskManage.openMask(id)
      }
    },
    close () {
      if ((this.useMask && this.closeOnClickMask)) {
        this.showMask = false
        let curMask = MaskManage.maskList.pop()
        MaskManage.unregiste(curMask.id)
        MaskManage.closeMask(curMask.id)
      }
    }
  },
  mounted () {
    if (this.showMask) {
      this.open()
    }
  }
}
