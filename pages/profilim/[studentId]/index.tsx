import StudentsDetail from "../../../src/app/presentation/pageComponents/Students/StudentsDetail"
import MentorDetail from "../../../src/app/presentation/pageComponents/Mentors/MentorDetail"
import React, { useEffect, useState } from 'react'
import { useApi } from '../../_app';
import { Education, Student } from '@/interfaces';
import { getUserToken } from '@/api';

const Index = () => {
  const [user, setUser] = useState<any>()
  const [studentEducations, setStudentEducations] = useState<Education[]>()

  const api = useApi();

  const handleChangeUser = (change: any) => {
    setUser({ ...user, ...change })
  }
  console.log("user", user)
  useEffect(() => {
    (async () => {
      // const response2 = await api.studentService.getStudentEducations!(user?.student?._id)
      const response3 = await api.utilsService.getUser!((await getUserToken()) as string)
      console.log("response3 ", response3)
      // setStudentEducations(response2.data)
      setUser(response3.data)
    })()
  }, [api, user?.student?._id])

  console.log(user?.type)

  return (
    <div>
      {user?.type !== "mentor" ?
        <StudentsDetail data={user} handleChangeData={handleChangeUser} educationsData={studentEducations!} />
        :
        <MentorDetail data={user} handleChangeData={handleChangeUser} educationsData={studentEducations!} />}
    </div>
  )
}

export default Index