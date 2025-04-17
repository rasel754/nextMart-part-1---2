import ManageCategories from "@/components/modules/shop/category";
import { getAllCategory } from "@/services/category";

const ProductCategoryPage =async() => {
  const {data ,meta} =await getAllCategory()
    return (
      <div>
       <ManageCategories categores={data}></ManageCategories>
      </div>
    );
};

export default ProductCategoryPage;