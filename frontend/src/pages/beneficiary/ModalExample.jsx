import Modal from '../../components/Modal'
import { useState } from 'react'
import BeneficiaryForm from './BeneficiaryForm'

export default function ExampleModal(){
  const [open, setOpen] = useState(true)

  return(
    <Modal title='Beneficiarios' open={open} onClose={()=>setOpen(false)}>
      <BeneficiaryForm onSubmit={()=>{}} />
    </Modal>

  )

}