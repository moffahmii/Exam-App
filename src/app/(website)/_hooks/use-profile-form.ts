import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useUpdateProfile } from './use-update-drofile'

export function useProfileForm() {
    const { data: session, update } = useSession()
    const { mutate, isLoading } = useUpdateProfile()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: ''
    })

    useEffect(() => {
        if (session?.user) {
            setFormData({
                firstName: session.user.firstName ?? '',
                lastName: session.user.lastName ?? '',
                username: session.user.username ?? '',
                email: session.user.email ?? '',
                phone: session.user.phone ?? ''
            })
        }
    }, [session?.user?.email])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const saveProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await mutate({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            profilePhoto: ''
        })

        if (result?.success) {
            await update({
                ...session,
                user: { ...session?.user, ...formData }
            })
        }
        return result
    }

    return { formData, handleChange, saveProfile, isLoading }
}