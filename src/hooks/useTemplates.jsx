import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { getTemplates } from "../api";


const useTemplates = () =>{

        const {data,refetch,isLoading,isErrors} = useQuery('templates',async()=>{
            try {
                const templates = await getTemplates();
                console.log(templates);
                return templates;       
            } catch (error) {
                toast.error("Something went wrong");
            }
        },
        {refetchOnWindowFocus : false}
    )
    return {data,refetch,isLoading,isErrors}
}

export default useTemplates;