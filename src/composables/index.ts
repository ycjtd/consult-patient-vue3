import { cancelOrder, deleteOrder, followOrUnfollow } from '@/services/consult'
import type { ConsultOrderItem, FollowType } from '@/types/consult'
import { ref } from 'vue'
import { getPrescriptionPic } from '@/services/consult'
import { showFailToast, showImagePreview, showSuccessToast } from 'vant'
import { OrderType } from '@/enums'

export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { follow, loading }
}

// 查看处方
// 封装查看处方逻辑
export const useShowPrescription = () => {
  const onShowPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPic(id)
      showImagePreview([res.data.url])
    }
  }
  return { onShowPrescription }
}

// 封装取消订单逻辑
export const useCancelOrder = () => {
  const loading = ref(false)
  const cancelConsultOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await cancelOrder(item.id)
      item.status = OrderType.ConsultCancel
      item.statusValue = '已取消'
      showSuccessToast('取消成功')
    } catch (error) {
      showFailToast('取消失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, cancelConsultOrder }
}

// 删除
export const useDeleteOrder = (cb: () => void) => {
  // 删除订单
  const loading = ref(false)
  const deleteConsultOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await deleteOrder(item.id)
      showSuccessToast('删除成功')
      // 成功，做其他业务
      cb && cb()
    } catch (e) {
      showFailToast('删除失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, deleteConsultOrder }
}
