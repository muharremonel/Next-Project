import React, { useEffect, useState } from 'react'
import { useApi } from '../_app'
import Loading from '@/app/presentation/components/Loading'
import Popup from '@/app/presentation/components/PopUp'
import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter();
  const api = useApi();
console.log("çalıştım")
  useEffect(() => {

    (async () => {
      const response = await api.getAuth()
      console.log(response)
      

      if (response?.status === "success") {
        if(response.data.user.type === "student"){
          const studentId = response?.data?.student?._id
          router.push(`/profilim/${studentId}`)
        }
        if(response.data.user.type === "mentor"){
          const mentorId = response?.data?.mentor?._id
          router.push(`/profilim/${mentorId}`)
        }
      } else {
        if (window.confirm("Öğrenci profili bulunamadı!")) {
          router.push("/anasayfa")
        }
      }
    })()
  }, [api, router])

  return (
    <Popup noBackground isOpen={true} onClose={() => { }}>
      <Loading />
    </Popup>
  )
}

export default Index