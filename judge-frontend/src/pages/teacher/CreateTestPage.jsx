import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import CreateTest from './CreateTest'

export default function CreateTestPage() {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <CreateTest onClose={() => navigate('/teacher')} />
      </div>
    </>
  )
}
