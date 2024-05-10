import React from 'react'
import ImportMain from '../../../components/Import/importmaintain/ImportMain'
import { auth } from '../../../lib/auth';
export default async function ImportPage() {
  const session = await auth();
  return (
    <div className=''>
        <ImportMain session={session.user.userId}/>
    </div>
  )
}
