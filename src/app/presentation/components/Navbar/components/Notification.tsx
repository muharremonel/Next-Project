import { Checkbox } from '@mui/material'
import React from 'react'

export const SmallNotification = ({ shown }: { shown?: boolean }) => {
  return shown ? (
    <div className="p-4 flex flex-col gap-4 bg-white">
      <p className="font-medium">Başlık burada olacak</p>
      <p className="text-sm line-clamp-2">Lorem ipsum dolor sit amet,
        consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa
        qui officia deserunt mollit anim id est laborum.</p>
      <p className="text-xs text-gray ">3 ay önce</p>
    </div>
  ) : (
    <div
      className="p-4 flex flex-col gap-4 bg-primaryLight border-l-4 border-orange">
      <p className="font-medium">Başlık burada olacak</p>
      <p className="text-sm line-clamp-2">Lorem ipsum dolor sit amet,
        consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa
        qui officia deserunt mollit anim id est laborum.</p>
      <p className="text-xs text-gray ">3 ay önce</p>
    </div>
  )
}

export const BigNotification = ({ shown }: { shown?: boolean }) => {
  return shown ? (
    <div className="p-4 flex flex-col gap-4 bg-white">
      <p className="font-medium">Başlık burada olacak</p>
      <p className="text-sm line-clamp-2">Lorem ipsum dolor sit amet,
        consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa
        qui officia deserunt mollit anim id est laborum.</p>
      <p className="text-xs text-gray ">3 ay önce</p>
    </div>
  ) : (
    <div className="p-8 flex bg-primaryLight border-l-4 border-l-orange">
      <div className="h-full flex flex-col gap-8 w-5/6">
        <p className="font-medium">Başlık burada olacak</p>
        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt
          mollit
          anim id est laborum.</p>
        <p className="text-xs text-gray ">3 ay önce</p>
      </div>
      <div className="h-full flex flex-col items-center justify-center w-1/6">
        <Checkbox />
        <p className="text-sm font-gray">Okundu</p>
      </div>
    </div>
  )
}