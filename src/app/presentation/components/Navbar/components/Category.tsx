import React, {useState, useEffect, useRef} from "react";
import {createPopper} from "@popperjs/core";
import {useApi} from "../../../../../../pages/_app";
import {BASE_URL} from "@/config";
import {ArrowDown} from "@/svgImports";
import {Produce} from "@/svgImports";

type Color = "white" | "orange" | "blue" | "red" | "green";

interface DropdownProps {
    color: Color;
}

const Dropdown: React.FC<DropdownProps> = ({color}) => {
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const btnDropdownRef = useRef<HTMLButtonElement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const popoverDropdownRef = useRef<HTMLDivElement | null>(null);
    const api = useApi();
    useEffect(() => {
        (async () => {
            const response = await api.categories();
            setCategories(response.data);
        })();
    }, []);

    const handleCategoryChange = (event: any) => {
        setSelectedCategory(event.target.value);
    };


    const category = categories?.map((category: any) => category);
    const icon = categories?.map((category: any) => category.icon);

    const openDropdownPopover = () => {
        if (btnDropdownRef.current && popoverDropdownRef.current) {
            createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
                placement: "bottom-start",
            });
        }
        setDropdownPopoverShow(true);
    };

    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    let bgColor;
    color === "white" ? (bgColor = "bg-white") : (bgColor = "bg-" + color + "500");

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-6/12 md:w-4/12 px-4">
                    <div className="relative inline-flex align-middle w-full">
                        <button
                            className={
                                " text-sm px-6 py-3 rounded  outline-none focus:outline-none mr-1 mb-1 " +
                                bgColor
                            }
                            style={{transition: "all .15s ease", letterSpacing: "2px"}}
                            type="button"
                            ref={btnDropdownRef}
                            onClick={() => {
                                dropdownPopoverShow
                                    ? closeDropdownPopover()
                                    : openDropdownPopover();
                            }}
                        >
                            <div className="flex items-center">
                    <span className={"text-" + (color === "white" ? "black" : "white")}>
                    {color === "white" ? "Kategoriler" : color + " Dropdown"}
                    </span>
                                <span className="ml-2 material-icons"
                                      style={{color: color === "white" ? "black" : "white"}}>
                        <ArrowDown/>
                    </span>
                            </div>
                        </button>
                        <div

                            className={
                                (dropdownPopoverShow ? "block " : "hidden ") +
                                (color === "white" ? "bg-white " : bgColor + " ") +
                                "text-base z-50 float-left py-2 p-3 px-4 list-none text-left shadow-lg mt-20"
                            }
                            style={{
                                minWidth: "19rem",
                                position: "absolute",
                                borderBottomRightRadius: "10px",
                                borderBottomLeftRadius: "10px"
                            }}
                        >

                            {category?.map((category, index) => (
                                <a
                                    key={index}
                                    href={category.href}
                                    className="category-link p-2 flex items-center"
                                    style={{color: "#5B5B5B"}}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        closeDropdownPopover()
                                    }}
                                >
                                    <img className="mr-2" src={`${BASE_URL}${category.icon}`} style={{width: "40px"}}
                                         alt=""/> {category.title} <br></br>
                                </a>
                            ))}

                            <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25"/>
                            <a
                                href="#"
                                className={
                                    "text-sm py-2 mb-2 mt-3 px-4 font-normal flex block w-full whitespace-no-wrap bg-transparent"
                                }
                                style={{
                                    backgroundColor: "rgba(242, 158, 81, 0.15)",
                                    borderRadius: "5px",
                                    color: "#F29E51"
                                }}
                                onClick={e => e.preventDefault()}
                            >
                                <Produce/> Proje Üretim Merkezi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const DropdownRender: React.FC = () => {
    return (
        <>
            <Dropdown color="white"/>
        </>
    );
};

export default DropdownRender;
