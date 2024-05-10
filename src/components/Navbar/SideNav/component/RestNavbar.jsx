"use server"
import {getUser} from "../../../../function/userInfo"
import CheckSection  from "../../../checkSection"

export default async function RestNavbar({children}) {
    const session = await getUser()

  return (
    <CheckSection session={session}>{children}</CheckSection>
  )
}
