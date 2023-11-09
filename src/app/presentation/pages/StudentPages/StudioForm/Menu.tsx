import React from 'react';
import { File, Home } from "@/svgImports";
import {Button} from "@/app/presentation/components";

export default function Menu() {
    return (
        <nav className="flex px-5 py-3 text-gray-700 md:p-10" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
             <Home/>
            </a>
          </li>
         
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Stüdyo Başvuru Formu</a>
            </div>
          </li>
         
        </ol>
      </nav>
    );
};
