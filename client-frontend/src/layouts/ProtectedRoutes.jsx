
import React, { useState } from 'react'
import {Outlet,useNavigate} from 'react-router-dom'

const ProtectedRoutes = () => {
const [isuserAuth, setUserAuth] =useState(false)
const navigate = useNavigate()
if(!isuserAuth){
  navigate('/login')
}
return (
<div><Outlet/></div>
)
}
export default ProtectedRoutes