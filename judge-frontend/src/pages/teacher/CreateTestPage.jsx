import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import CreateTest from './CreateTest'

export default function CreateTestPage() {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-8">
        <CreateTest onClose={() => navigate('/teacher')} />
      </div>
    </>
  )
}
