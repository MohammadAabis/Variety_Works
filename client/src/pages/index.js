import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/reducer/authReducer";
const Index = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login');
        }
    });

    const handleLogout = () =>{
        dispatch(logout());
        navigate('/login');
    }

  return (
    <>
        <div>
            <h1>Welcome to our website!</h1>
            <p>This is our main page.</p>
        </div>
        <br />
        <br />

        <button onClick={handleLogout}>Logout</button>

        
    </>
    
  );
};

export default Index;

/*
// lazzy loading code

import React, { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';

const InfiniteScrollComponent = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.example.com/data?page=${page}&limit=10`);
            setData(prevData => [...prevData, ...response.data]);
            if (response.data.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const lastElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <div>
            <ul>
                {data.map((item, index) => {
                    if (index === data.length - 1) {
                        return <li ref={lastElementRef} key={item.id}>{item.name}</li>;
                    } else {
                        return <li key={item.id}>{item.name}</li>;
                    }
                })}
            </ul>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default InfiniteScrollComponent;
 */
