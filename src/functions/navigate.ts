import { useNavigate } from 'react-router-dom';

export default function navigate (path: String){
    const nav = useNavigate();
    nav(path.toString());
}