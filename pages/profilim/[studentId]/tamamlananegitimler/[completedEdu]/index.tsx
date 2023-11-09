import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CompletedEdus from "../../../../../src/app/presentation/pageComponents/Educations/CompletedEdus"
import { useApi } from '../../../../_app'
import { Education, EnrolledEducations} from '@/interfaces'

const Index = () => {
  const [education, setEducation] = useState<Education>()
  const [studentEducation, setStudentEducation] = useState<EnrolledEducations>()
  const router = useRouter()
  const api = useApi();

  const { completedEdu, studentId } = router.query

  useEffect(() => {
    (async () => {
      const response = await api.educationService.getEducation!(completedEdu)
      const response2 = await api.studentService.getStudent!(studentId)

      setEducation(response.data)
      setStudentEducation(response2.data?.educations?.find((i: any) => i?.educationId === completedEdu))
    })()

  }, [api, studentId, completedEdu])

  return (
    <div>
     <CompletedEdus educationData={education!} studentEducation={studentEducation!} />
    </div>
  )
}

export default Index