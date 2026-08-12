    import { createClient } from '@/utils/supabase/client'
    import { NextPage } from 'next'
    import { useEffect, useState } from 'react'
    import { User } from '@supabase/supabase-js'
    import Image from 'next/image'

    interface Props {className?:string}
    const Avatar: NextPage<Props> = ({className}) => {
        const [user,setUser]=useState<User | null>(null)
        const [avatarURL,setAvatarURL]=useState('/placeholder.jpeg')


        const supabase = createClient()
        useEffect(()=>{
            async function getUser(){
                
            const  { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            const {data} = await supabase.from('profile').select('*')
            .eq('user_id', user?.id).maybeSingle()
            setAvatarURL(data.avatar_url)
            console.log(user)}   
            getUser()
        },[])
    return  <Image src={ avatarURL || '/placeholder.jpg'} alt='' className={`rounded-4xl ${className}`} width={999} height={999}/>
            
    }

    export default Avatar