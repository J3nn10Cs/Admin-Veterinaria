
const checkAuth = (req,res,nex) => {
    console.log('Desde middelware');
    nex();
}

export default checkAuth