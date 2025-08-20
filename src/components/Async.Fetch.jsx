import { useFetchStore } from "../store/store"
import { useEffect, useState } from "react"
export default function AsyncFetch(){
    const [loading, setLoading]=useState(false)
    const addPosts = useFetchStore((state)=>state.getPostsAsync)
    async function handleClick(){
        setLoading(true)
        await addPosts()
        setLoading(false)
    }
    const posts = useFetchStore((state)=> state.posts)
    useEffect(()=>{
        console.log(posts)
    },[posts])
    return(
        <>  
            <button onClick={()=>handleClick()}>Load Async Posts</button>
            {loading && <div>Loading Posts...</div>}
            <div>
                <ul>
                    {posts.map((post)=>
                    (
                        <div key={post.id}>
                    <p style={{fontWeight:"bold"}}> {post.title}</p>
                    <p><span>Posted by User: {post.id}</span></p>
                    <p>{post.body}</p>
                    <hr />
                    </div>
                    ))}
                </ul>
            </div>
            </>
    )
}