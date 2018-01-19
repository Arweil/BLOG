let createElement = (id) => {
  let divModal = document.createElement('div')
  let instance = MaskManage.maskObj[id]
  divModal.className = 'mask'
  divModal.setAttribute('id', id)
  document.body.appendChild(divModal)

  document.body.style.overflow = 'hidden'

  divModal.addEventListener('click', () => {
    instance.close()
  })

  divModal.addEventListener('touchmove', (event) => {
    event.preventDefault()
    event.stopPropagation()
  })
}

let removeElement = (id) => {
  let divModal = document.getElementById(id)
  document.body.removeChild(divModal)

  document.body.style.overflow = ''
}

let MaskManage = {
  maskId: 0,
  maskObj: {},
  maskList: [],
  registe: (id, instance) => {
    MaskManage.maskObj[id] = instance
  },
  unregiste: (id) => {
    MaskManage.maskObj[id] = null
    delete MaskManage.maskObj[id]
  },
  openMask: (id) => {
    MaskManage.maskList.push({ id })
    createElement(id)
  },
  closeMask: (id) => {
    removeElement(id)
  }
}

export { MaskManage }
