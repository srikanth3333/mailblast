import Link from 'next/link'
import React from 'react'
import {useSelector} from 'react-redux'

function Index() {

  let user = useSelector(state => state.auth)

  console.log(user)
  return (
    <div className="text-center my-4">
        <p className="mb-2">Dashboard Analytics and Graphs Coming Soon!</p>
        <Link href="/excelUpload">Go to My contacts</Link>
    </div>
  )
}

export default Index