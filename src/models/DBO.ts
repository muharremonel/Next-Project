export interface RegisterDataDBO {
    phoneNumber: string,
    password: string,
    email: string
    birthday: string
    tck: string
    name: string
    surname: string
    universityName?: string
    departmentOfUniversity?: string
    city?:string,
    town?:string,
    district?:string
}

export interface LoginDataDBO{
    loginField:string,
    password:string
}