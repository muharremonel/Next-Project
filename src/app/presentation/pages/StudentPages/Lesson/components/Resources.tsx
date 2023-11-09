import React from 'react';
import { Download } from "@/svgImports";

interface Props {
    resources: any[];
    lesson:any
}

const ResourcesTable: React.FC<Props> = ({ resources ,lesson}) => {

    // console.log(lesson)

    return (
        <div className="flex flex-col gap-8">
            <div className="text-2xl font-bold">Kaynaklar</div>
            <div className="bg-gray-100 rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold p-4 text-center">
                    <div>Dosya İsmi</div>
                    {/*<div>Yüklenme Tarihi</div>*/}
                    {/*<div>Dosya Boyutu</div>*/}
                    <div>İndir</div>
                </div>

                {lesson?.map((resource:any,index:number) => (
                    <div key={index} className="p-2 bg-white">
                        <div key={index}
                             className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 text-center border-b pt-4 bg-white">
                            <div className="md:hidden font-bold">Dosya İsmi:</div>
                            <div>{resource.title}</div>

                            {/*<div className="md:hidden font-bold">Yüklenme Tarihi:</div>*/}
                            {/*<div>{resource.uploadDate.toLocaleDateString()}</div>*/}

                            {/*<div className="md:hidden font-bold">Dosya Boyutu:</div>*/}
                            {/*<div>{resource.fileSize}</div>*/}

                            <div className="flex justify-center md:hidden font-bold">İndir:</div>
                            <div className="flex justify-center md:justify-end">
                                <a
                                    href={resource.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    <Download />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResourcesTable;
