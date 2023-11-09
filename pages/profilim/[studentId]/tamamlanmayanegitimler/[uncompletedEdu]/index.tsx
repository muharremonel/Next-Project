import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import UnCompletedEdus from "../../../../../src/app/presentation/pageComponents/Educations/UnCompletedEdus"
import { useApi } from '../../../../_app'

const Index = () => {
  const [education, setEducation] = useState<any>()
  const [studentEducation, setStudentEducation] = useState<any>()
  const router = useRouter()
  const api = useApi();

  const { uncompletedEdu, studentId } = router.query

  useEffect(() => {
    (async () => {
      const response = await api.educationService.getEducation!(uncompletedEdu)
      const response2 = await api.studentService.getStudent!(studentId)

      setEducation(response.data)
      setStudentEducation(response2.data?.educations?.find((i: any) => i?.educationId === uncompletedEdu))
    })()

  }, [api, studentId, uncompletedEdu])

  return (
    <div>
      <UnCompletedEdus educationData={education!} studentEducation={studentEducation!} />
    </div>
  )
}

export default Index