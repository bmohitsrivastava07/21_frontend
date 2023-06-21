import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import AddProductRequest from '../../../Models/AddProductRequest';

export const AddNewProduct = () => {

    const { authState } = useOktaAuth();

    // New Art
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [ quantities, setQuantities] = useState(0);
    const [category, setCategory] = useState('Category');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }
    async function base64ConversionForImages(e:any) {
        if(e.target.files[0]){
            getBase64(e.target.files[0]);
        }
        
    }
    function getBase64(file:any){
        let reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(){
            setSelectedImage(reader.result);
        };
        reader.onerror=function(error){
            console.log('Error', error);
        }
    }

    async function submitNewProduct(){
        const url=`http://localhost:8081/admin/secure/add/product`;
        if(authState?.isAuthenticated && title!==''&& artist!==''&& category!=='Category' && productDescription!==''&& quantities>=0){
            const product: AddProductRequest=new AddProductRequest(title,artist,productDescription,quantities,category);
            product.image=selectedImage;
            const requestOptions={
                method:'POST',
                headers:{
                    Authorization:`Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(product),
            };

            const submitNewProductResponse=await fetch(url,requestOptions);
            if(!submitNewProductResponse.ok){
                throw new Error('Something went wrong');
            }
            setTitle('');
            setArtist('');
            setProductDescription('');
            setQuantities(0);
            setCategory('Category');
            setSelectedImage(null);
            setDisplaySuccess(true);
            setDisplayWarning(false);
        }
        else{
            setDisplaySuccess(false);
            setDisplayWarning(true);
        }
    }
    return (
        <div className='container mt-5 mb-5'>
            {displaySuccess && 
                <div className='alert alert-success' role='alert'>
                    Art added successfully
                </div>
            }
            {displayWarning && 
                <div className='alert alert-danger' role='alert'>
                    All fields must be filled out
                </div>
            }
            <div className='card'>
                <div className='card-header'>
                    Add a new art
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Title</label>
                                <input type="text" className='form-control' name='title' required 
                                    onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Artist </label>
                                <input type="text" className='form-control' name='artist' required 
                                    onChange={e => setArtist(e.target.value)} value={artist}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Category</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' 
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {category}
                                </button>
                                <ul id='addNewBookId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a onClick={() => categoryField('DIGITAL ART')} className='dropdown-item'>Digital Art</a></li>
                                    <li><a onClick={() => categoryField('SPRAY ART')} className='dropdown-item'>Spray Art</a></li>
                                    <li><a onClick={() => categoryField('CRAYON ART')} className='dropdown-item'>Crayon Art</a></li>
                                    <li><a onClick={() => categoryField('MANDALA ART')} className='dropdown-item'>Mandala Art</a></li>
                                    <li><a onClick={() => categoryField('OIL PAINT')} className='dropdown-item'>Oil Paint</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} 
                                onChange={e => setProductDescription(e.target.value)} value={productDescription}></textarea>
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Quantities</label>
                            <input type='number' className='form-control' name='Quantities' required 
                                onChange={e => setQuantities(Number(e.target.value))} value={quantities}/>
                        </div>
                        <input type='file' onChange={e=>base64ConversionForImages(e)}/>
                        <div>
                            <button type='button' className='btn btn-primary mt-3'onClick={submitNewProduct}>
                                Add Art
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}