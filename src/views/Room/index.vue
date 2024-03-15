<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import io, { Socket } from 'socket.io-client'
import { onMounted, onUnmounted, ref, nextTick, provide } from 'vue'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { MsgType } from '@/enums'
import type { Message, TimeMessages } from '@/types/room'
import { ConsultOrderItem } from '../../types/consult'
import { getConsultOrderDetail } from '@/services/consult'
import { OrderType } from '@/enums'
import { showToast } from 'vant'
import dayjs from 'dayjs'

const consult = ref<ConsultOrderItem>()
const loadConsult = async () => {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  consult.value = res.data
}
provide('consult', consult)

const completeEva = (score: number) => {
  const item = list.value.find((item) => item.msgType === MsgType.CardEvaForm)
  if (item) {
    item.msg.evaluateDoc = { score }
    item.msgType = MsgType.CardEva
  }
}
provide('completeEva', completeEva)

const store = useUserStore()
const route = useRoute()
const list = ref<Message[]>([])
const initialMsg = ref(true)
let socket: Socket
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
onMounted(async () => {
  loadConsult()
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })
  socket.on('connect', () => {
    list.value = []
  })
  socket.on('disconnect', () => {
    console.log('连接关闭')
  })
  socket.on('error', () => {
    console.log('发送错误')
  })

  // 获取聊天记录 如果是第一次(默认消息)
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = []
    data.forEach((item, i) => {
      if (i === 0) time.value = item.createTime
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    // 追加到聊天消息列表
    list.value.unshift(...arr)

    loading.value = false
    if (!data.length) {
      return showToast('没有聊天记录了')
    }
    nextTick(() => {
      if (initialMsg.value) {
        socket.emit('updateMsgStatus', arr[arr.length - 1].id)
        window.scrollTo(0, document.body.scrollHeight)
        initialMsg.value = false
      }
    })
  })
  // 监听订单状态变化
  socket.on('statusChange', () => {
    loadConsult()
  })
  // 接收消息
  socket.on('receiveChatMsg', async (event) => {
    list.value.push(event)
    await nextTick()
    socket.emit('updateMsgStatus', event.id)
    window.scrollTo(0, document.body.scrollHeight)
  })
})

onUnmounted(() => {
  socket.close()
})

// 发送文字信息
const onSendText = (text: string) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: {
      content: text
    }
  })
}

// 发送图片
const onSendImage = (image: Image) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: {
      picture: image
    }
  })
}

const loading = ref(false)
const onRefresh = () => {
  // 触发下拉
  socket.emit('getChatMsgList', 20, time.value, route.query.orderId)
}
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
    <!-- 状态栏 -->
    <room-status
      :status="consult?.status"
      :countdown="consult?.countdown"
    ></room-status>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <!-- 消息 -->
      <room-message
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></room-message>
    </van-pull-refresh>

    <!-- 操作栏 -->
    <room-action
      :disabled="consult?.status !== OrderType.ConsultChat"
      @send-text="onSendText"
      @send-image="onSendImage"
    ></room-action>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
