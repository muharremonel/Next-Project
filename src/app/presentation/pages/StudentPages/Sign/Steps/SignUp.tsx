import React, {ChangeEvent, useEffect, useState} from 'react';
import {TextField, Button} from "@mui/material";
import Link from "next/link";
import ReactPhoneInput from "react-phone-input-material-ui";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import CircularProgress from '@mui/material/CircularProgress';
type FormData = {
    [key: string]: string;
};

type SignUpProps = {
    onSave: (formData: any) => void
    onChange: (key: string, value: string, formData: any) => void
    onInputsFilledCorrectly: (correctlyFilledInputs: FormData) => void
    address: string
    // onProceed: () => void
    phoneFiller: (phone: string) => void
    isLoading: boolean;

    
}

  

const INPUTS = {
    tck: {
        initialValue: '',
        title: 'Tc Kimlik No',
        type: "text",
        maxLength: 11,
        valChecker: (val: string) => val.length === 11
    },
    birthday: {
        initialValue: '',
        title: 'Doğum Tarihi',
        type: "date",
        maxLength: 10,
        valChecker: (val: string) => {
            const year = parseInt((val.split('-'))[0])
            if (year > 1900 && year < 2050) {
                return true
            } else return false
        }
    },
    address: {
        initialValue: '',
        title: 'Adres bilgileri TC no ve Doğum tarihi girince otomatik dolacaktır.',
        type: "text",
        maxLength: 9999,

        valChecker: (val: string) => false
    },
    firstname: {
        initialValue: '',
        title: 'Ad',
        type: "text",
        maxLength: 20,

        valChecker: (val: string) => false
    },
    lastname: {
        initialValue: '',
        title: 'Soyad',
        type: "text",
        maxLength: 20,

        valChecker: (val: string) => false
    },
    email: {
        initialValue: '',
        title: 'E-mail',
        type: "text",
        maxLength: 50,

        valChecker: (val: string) => false
    },

    phone: {
        initialValue: '',
        title: 'Telefon Numarası',
        type: "text",
        maxLength: 10,

        valChecker: (val: string) => false
    },
    school: {
        initialValue: '',
        title: 'Okuduğun Üniversitenin Adı',
        type: "text",
        maxLength: 40,

        valChecker: (val: string) => false
    },
    department: {
        initialValue: '',
        title: 'Okuduğun Bölümün Adı',
        type: "text",
        maxLength: 40,

        valChecker: (val: string) => false
    },
    password: {
        initialValue: '',
        title: 'Şifre',
        type: "password",
        maxLength: 20,

        valChecker: (val: string) => false
    },
    rePassword: {
        initialValue: '',
        title: 'Şifreyi Tekrar Girin',
        type: "password",
        maxLength: 20,

        valChecker: (val: string) => false
    },
    gender: {
        initialValue: '',
        title: 'Cinsiyet',
        type: "radio",
        maxLength: 20,
        valChecker: (val: string) => val === "male" || val === "female"
    },
}

const correctlyFilled = (formData: any) => {
    console.log("formData",formData)
    const result: any = {};

    const keys = Object.keys(formData);
    for (let key of keys) {
        const val = formData[key];
        const spec = (INPUTS as any)[key]

        if (spec.valChecker(val)) {
            result[key] = val;
        }
    }

    return result;
}
const SignUp = ({
                    onSave,
                    onChange,
                    onInputsFilledCorrectly,
                    address,
                    isLoading,
                    phoneFiller,
                }: SignUpProps) => {


    const [phoneNumber, setPhoneNumber] = useState("")
    const initialFormData = {...Object.entries(INPUTS).reduce(
        (acc, [name, {initialValue}]) => ({...acc, [name]: initialValue}), {}), gender: 'male'};
    
    const [formData, setFormData] = useState<FormData>(initialFormData);
    
    const [allInputsFilled, setAllInputsFilled] = useState(false);

    const checkAllInputsFilled = (updatedFormData: FormData) => {
        for (const key in updatedFormData) {
            
            // Eğer kontrol edilen alan "universityName" veya "universityDepartmentName" ise kontrolü atla.
            if (key === "school" || key === "department") {
                continue;
            }

            if (updatedFormData[key] === "") {
                setAllInputsFilled(false);
                return;
            }
        }
        setAllInputsFilled(true);
    };
    const handleInputChange = (title: string, value: string) => {
        const formattedPhone = phoneNumber.startsWith('90') && phoneNumber.substring(2);
        const updatedFormData = {
            ...formData,
            [title]: value,
            phone: formattedPhone && formattedPhone || phoneNumber
        };

        setFormData(updatedFormData);
        checkAllInputsFilled(updatedFormData);
    };

    useEffect(() => {
        if (address) {
            handleInputChange("address", address)
        }
    }, [address])


    return (
        <div className={'w-full h-full flex justify-center items-center '}>
            <div
                className='w-11/12 md:w-1/2 h-3/4 md:h-max overflow-y-auto md:overflow-visible bg-white rounded-xl px-4 shadow-2xl  '>
                <div className={"max-md:sticky mb-4 top-0 bg-white z-40 text-3xl text-primary p-4 px-9 font-bold"}>
                    Kayıt ol
                </div>
                <div className='pl-6 pr-6 mb-4'>
                    <TextField
                        inputProps={{maxLength: INPUTS.address.maxLength,
                            className: "" ,
                        }}
                        multiline
                        type={INPUTS.address.type}
                        variant="outlined"
                        fullWidth
                        label={INPUTS.address.title}
                        value={address}
                        name="address"
                        disabled={true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const newVal = e.target.value;
                            handleInputChange("address", newVal);
                            onChange("address", newVal, formData);
                        }}
                    />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 pr-6'>

                    {Object.entries(INPUTS).map(([name, formSpecs]) => {
                        if (name === "address") return null;

                        const labelWithRequired = name !== "school" && name !== "department" ? `${formSpecs.title} (zorunlu)` : `${formSpecs.title} (opsiyonel)`;

                        if (name === "gender") {
                            return (
                                <div className='mb-4 mt-2' key={name}>
                                    <label htmlFor="cinsiyet">{formSpecs.title}</label>
                                    <RadioGroup
                                        id='cinsiyet'
                                        aria-label="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            const newVal = e.target.value;
                                            setFormData(prevData => ({...prevData, gender: newVal}));
                                            onChange("gender", newVal, formData);
                                        }}
                                    >
                                        <div className='flex items-center'>         
                                            <FormControlLabel value="female" control={<Radio color="primary" />} label="Kadın" />
                                            <FormControlLabel value="male" control={<Radio color="primary" />} label="Erkek" />
                                        </div>
                                    </RadioGroup>
                                </div>
                            );
                        }
                        return formSpecs.type !== "date" ? (
                                <div key={name}>
                                    {name !== "phone" ? <TextField
                                            inputProps={{maxLength: formSpecs.maxLength, height: 90}}
                                            type={formSpecs.type}
                                            variant="outlined"
                                            fullWidth
                                            label={labelWithRequired}
                                            value={formSpecs.title === "Adres" ? address : formData[name]}
                                            name={name}
                                            disabled={formSpecs.title === "Adres"}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                const newVal = e.target.value;
                                                handleInputChange(name, newVal);
                                                onChange(name, newVal, formData);

                                                if (name === 'tck' || name === 'birthday') {
                                                    const tckVal = name === 'tck' ? newVal : formData['tck'];
                                                    const birthdayVal = name === 'birthday' ? newVal : formData['birthday'];

                                                    if (tckVal.length === 11 && INPUTS.birthday.valChecker(birthdayVal)) {
                                                        onInputsFilledCorrectly(
                                                            correctlyFilled({...formData, [name]: newVal})
                                                        )

                                                    }
                                                } else {
                                                    if (formSpecs.valChecker(newVal)) {
                                                        onInputsFilledCorrectly(
                                                            correctlyFilled({...formData, [name]: newVal})
                                                        );
                                                    }
                                                }
                                            }}
                                        />
                                        :
                                        <ReactPhoneInput placeholder={"5xx xxx xx xx"} label={"Telefon"} country={"tr"}
                                                         component={TextField}
                                                         value={phoneNumber} onChange={setPhoneNumber}/>
                                    }
                                </div>
                            )
                            :
                            <div key={name}>
                                <TextField
                                    type={formSpecs.type}
                                    variant="outlined"
                                    fullWidth
                                    value={formSpecs.title === "Adres" ? address : formData[name]}
                                    name={name}
                                    disabled={formSpecs.title === "Adres"}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        const newVal = e.target.value;
                                        handleInputChange(name, newVal);
                                        onChange(name, newVal, formData);

                                        if (name === 'tck' || name === 'birthday') {
                                            const tckVal = name === 'tck' ? newVal : formData['tck'];
                                            const birthdayVal = name === 'birthday' ? newVal : formData['birthday'];

                                            if (tckVal.length === 11 && INPUTS.birthday.valChecker(birthdayVal)) {
                                                onInputsFilledCorrectly(
                                                    correctlyFilled({...formData, [name]: newVal})
                                                );
                                            }
                                        } else {
                                            if (formSpecs.valChecker(newVal)) {
                                                onInputsFilledCorrectly(
                                                    correctlyFilled({...formData, [name]: newVal})
                                                );
                                            }
                                        }
                                    }}
                                />
                            </div>
                    })}
                </div>
               
                <div className={'max-md:sticky bottom-0 w-full px-6 p-4 bg-white z-49'}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{backgroundColor: allInputsFilled ? "#222D68" : "#c7c7cb", borderRadius: "20px"}}
                        fullWidth
                        disabled={!allInputsFilled}
                        onClick={() => {
                            onSave(formData);
                            phoneFiller(formData['phone']);
                        }}
                        >
                        {(isLoading == true) ? <CircularProgress size={20} className='mr-4 text-orange'/> : "Kayıt Ol"}
                      
                    </Button>
                </div>
                <div className={"w-full flex gap-4 justify-center p-4 items-center"}>
                    <div>Hesabınız var mı ?</div>
                    <Link href={"/giris"}>
                        <div className={"cursor-pointer font-semibold transition-all hover:scale-125"}>Oturum açın.
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;