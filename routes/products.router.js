import express from 'express'
import Product from "../schemas/products.schema.js"

const router = express.Router()




//상품 목록 조회
router.get('/products', async(req, res) => {
    const products = await Product.find().sort('-createdAt').exec()
   
    return res.status(200).json({products})
})


//상품 상세조회
router.get('/products/:productId', async(req, res) => {
    const { productId } = req.params

    if(!productId || productId.trim() === '') {
        return res.status(400).json({message: "데이터 형식이 올바르지 않습니다"});
    }
    
    const detailProduct = await Product.findById(productId).exec()

    if(!detailProduct){
        return res.status(404).json({errorMessage: "상품 조회에 실패하였습니다."})
    }

    return res.status(200).json({detailProduct})
})

//상품 등록
router.post('/products', async(req, res) => {
    const {title, content, author, password} = req.body
    const status = "FOR_SALE"

    if(!title || !content || !author || !password) {
        return res.status(400).json({errorMessage: "데이터 형식이 올바르지 않습니다"});
    }

    const product = new Product({title, content, author, password, status})
    await product.save()
    return res.status(201).json({message: "판매 상품을 등록하였습니다"})
})


//상품 정보 수정
router.patch('/products/:productId', async(req, res) => {
    //변경할 상품 id
    const { productId } = req.params
    const {title, content, status, password} = req.body

    //변경할 상품 정보를 가져온다
    const findByProductId = await Product.findById(productId)

    if(!findByProductId){
        return res.status(404).json({errorMessage: "상품 조회에 실패하였습니다."})
    }

    if(findByProductId.password !== password){
        return res.status(401).json({errorMessage: "비밀번호가 일치하지 않습니다"})
    }

    const modifyProduct = await Product.findByIdAndUpdate(productId, {
        title: title,
        content: content,
        status: status
    })

    if(!title || !content || !author || !password) {
        return res.status(400).json({errorMessage: "데이터 형식이 올바르지 않습니다"});
    }

    await modifyProduct.save()

    
    return res.status(200).json({message: "상품 정보를 수정하였습니다."})
})

// 5. 상품 삭제 API

router.delete('/products/:productId', async(req, res) => {
    const { productId } = req.params
    const {password} = req.body

    const findByProductId = await Product.findById(productId)

    if(!findByProductId){
        return res.status(404).json({errorMessage: "상품 조회에 실패하였습니다."})
    }

    if(findByProductId.password !== password){
        return res.status(401).json({errorMessage: "비밀번호가 일치하지 않습니다"})
    }

    await Product.deleteOne({_id: productId}).exec()

    return res.status(200).json({message:"상품을 삭제하였습니다."})
})



export default router


