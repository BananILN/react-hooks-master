import React, {useState} from 'react';
import './TaskThree.css';
import { useEffect } from 'react';
import { useCallback } from 'react';



const useFetchPosts = () => {
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [abortController, setAbortController] = useState(null);

    const fetchData = useCallback( async (searchQuery, signal) => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchQuery}`, { signal });
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            const data = await response.json();
            setPosts(Array.isArray(data) ? data : []); 
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Ошибка при загрузке данных:', error);
                setPosts([]); 
            }
        } finally {
            setIsLoading(false);
        }
    });


    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

   
    useEffect(() => {
        if (abortController) {
            abortController.abort(); 
        }
        const newAbortController = new AbortController();
        setAbortController(newAbortController);

        const debouncedFetch = debounce(() => {
            if (search.trim()) { 
                fetchData(search, newAbortController.signal);
            } else {
                setPosts([]); 
            }
        }, 300); 
        debouncedFetch();

        return () => {
            newAbortController.abort(); 
        };
    }, [search]);

    return { search, setSearch, posts, isLoading };
}

export default function TaskThree() {
   
    const { search, setSearch, posts, isLoading } = useFetchPosts();

    return (
        <div className="TaskThree">
            <input
                type="text"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search posts"
                value={search}
            />
            <h1>Posts</h1>
            {isLoading ? (
                <p>Загрузка...</p>
            ) : (
                <ul>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <li key={post.id}>{post.title}</li>
                        ))
                    ) : (
                        <p>Посты не найдены</p>
                    )}
                </ul>
            )}
        </div>
    );
}