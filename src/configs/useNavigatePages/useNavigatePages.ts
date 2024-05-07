import { useNavigate, useParams } from "react-router-dom";

function useNavigatePages() {
    const {page = "1"} = useParams()
    const navigate = useNavigate();

    function back() {
        navigate(`/page/${+page - 1}`)
    }
    function next() {
        navigate(`/page/${+page + 1}`)
    }
    function goToProduct(productId: number) {
        navigate(`/product/${productId}`)
    }
    function backToProducts() {
        navigate(-1)
    }

    function goToCategories(id: string) {
        navigate(`/categoryId/${id}`)
    }
    
    return {
        back,
        next,
        goToProduct,
        backToProducts,
        goToCategories
    }
}

export default useNavigatePages