"use client"
import Link from "next/link"
import React, { FunctionComponent, ReactElement } from "react"
import  {usePathname} from "next/navigation"
type LinkProps = {
  href: string
  children: ReactElement
  activeClass: string
}

const ActiveLink: FunctionComponent<LinkProps> = ({children, ...props}) => {
  const pathname  = usePathname()
  let className = ""
 
  
  let _defaultClass = `${className} text-gray-100`

  if (pathname === props.href) {
    className = `${className} text-indigo-400 ${props.activeClass}`
  } else {
    className = _defaultClass;
  }

  return (
    <Link {...props}>
      {
        React.cloneElement(children, {className})
      }
    </Link>
  )
}

export default ActiveLink;