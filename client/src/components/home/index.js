import { useEffect } from "react";
import Grid from '@mui/material/Grid'
import Button from "@mui/material/Button";
import  Divider  from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { homeLoadMore } from "../../store/actions/articles";
import ArticleCard from "../../utilis/aerticle_card"; 
import HeaderLanding from "../landing"
import ScrollToTop from "react-scroll-to-top";



const Home = () => {
    const articles = useSelector(state => state.articles)
    const dispatch = useDispatch();

    useEffect(() => {
        if(articles.articles.length <=0){
        dispatch(homeLoadMore(articles.homeSort));

        }

    }, [dispatch])
const getNextArticles =()=>{
let skip = articles.homeSort.skip + articles.homeSort.limit;
dispatch(homeLoadMore({...articles.homeSort, skip: skip}));

}


    return (
        <>
      <HeaderLanding />
      
      <Divider className="mt-3 mb-3"/>
            <Grid container  spacing={2} className="article_card">
                {articles && articles.articles ?
        
                articles.articles.map(item =>(

                    <Grid key={item._id} item xs={12} sm={6} lg ={3}>
                       <ArticleCard article={item}/>
                    </Grid>
                ))

              : null}
               
            </Grid>
                  <hr/> 
            <Button
            variant="outlined"
            onClick={getNextArticles}>
                Load more
            </Button>
            <ScrollToTop  top = '1000'/>
        </>
    )
}
export default Home;