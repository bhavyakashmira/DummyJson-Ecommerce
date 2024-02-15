import React , {useEffect, useState} from 'react';
import { Button, TextField,Slider,Card ,CardContent, Typography, Container, Grid, makeStyles, Link } from '@mui/material';
import ProductCard from '../Components/Card';
import SearchAppBar from '../Components/Navbar';
import { useApi } from '../Context/Context';
import { auth } from "../Firebase/Firebase.js";
import { blueGrey } from '@mui/material/colors';


function LandingPage() {

    const [value, setValue] = useState([0, 1000]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    
    const { data,numsco ,searchQuery , val} = useApi()
    
    const data1 = searchQuery
        ? data.filter(article =>
            article.description &&
            (article.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : data;
    
 
    const filteredPrice = [value[0], value[1]];

    const filteredData = filteredPrice
        ? data1.filter(article => {
            const priceInRange = article.price >= filteredPrice[0] && article.price <= filteredPrice[1];
            return priceInRange;
        })
        : data1;
    console.log(filteredData)

    return (
        <>
            <SearchAppBar />
            <div style={{  display: 'grid', gridTemplateColumns: '1fr 4fr', padding:5 }}>
                <div style={{ backgroundColor: 'white', margin: 4, height: '500px', padding: 1,borderRadius:'10px'}}>
                    <div style={{ width: 300, margin: 'auto', marginTop: 20 , backgroundColor:blueGrey[900],textAlign:'center',color:'white' , borderBlockColor:'Highlight', borderRadius:'10px' }}>
                        <Typography
                            id="price-range-slider"
                            gutterBottom
                            sx={{
                                fontFamily: 'Arial, sans-serif',
                                fontWeight:'bold' 
                            }}
                        >
                            Price Range
                        </Typography>
                        <div>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="price-range-slider"
                            min={30}
                            max={1200}
                                sx={{
                                    width: '200px', // Set the width to make the slider smaller
                                    backgroundColor: 'gray', // Add color to the background
                                    margin: 2,
                                   border:'black'
                                }}
                            />
                        </div>
                        <Typography gutterBottom>
                            &#8377;{value[0]} - &#8377;{value[1]}
                        </Typography>
                    </div>
                    <Card variant="outlined" style={{ marginBottom: '20px', borderRadius: '8px' }}>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Checkout Summary
                            </Typography>
                            <Typography variant="body1" component="p" gutterBottom>
                                Total Items Purchased:{numsco}
                            </Typography>
                            <Typography variant="body1" component="p">
                                Total Cost:{val}
                            </Typography>
                        </CardContent>
                    </Card>


                  
                </div>

                
        <div >
            <div sx={{ maxWidth: 400, margin: 'auto', marginTop: 4, backgroundColor: 'black', padding: 3 }} >
                        <Typography variant="h2" component="h1" gutterBottom sx={
                        { textAlign:'center'}
                }>
                    Welcome to Our Website
                </Typography>

            </div>
            <Grid container spacing={3} >
            {filteredData.map((product, index) => (
                <Grid item  xs={4} sm={6} md={4}>
                <ProductCard key={index} {...product} />
            
                 </Grid>
            ))}
            </Grid>
                </div>
       
         </div>
        </>
    );
}

export default LandingPage;
