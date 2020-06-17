import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaPen, FaSave } from 'react-icons/fa'
import emptyImage from '../../assets/empty-image.png'
import swal from 'sweetalert'

import './styles.css'

import api from '../../services/api'

import Header from '../../components/Header'

export default function Profile() {

  const[produto, setProduto] = useState('')
  const[descricao, setDescricao] = useState('')
  const[preco, setPreco] = useState('')

  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')
  const [showDiv, setShowDiv] = useState(false)

  const id = localStorage.getItem('id')

  //Busca os produtos já cadastrados
  useEffect(() => {
    api.get('produtos', {
      headers: {
        auth: id
      }
    }).then(res => {
      setProducts(res.data)
    })
  }, [id, showDiv])

  async function handleDelete(prod_id) {
    let confirmDelete = false

    await swal({
      title: 'Tem certeza?',
      text: 'Uma vez deletado, você não poderá recuperar o produto!',
      icon: 'warning',
      buttons: ['Cancelar', 'Excluir'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        confirmDelete = true     
      } else {
        swal('O produto não foi deletado!')
      }
    })

    if(confirmDelete) {
      try {
        await api.delete(`produtos/${prod_id}`, {
          headers: {
            auth: id
          }
        })
        setProducts(products.filter(product => product._id !== prod_id))

        swal('O produto foi deletado com sucesso', {
          icon: 'success',
        })
      } catch(err) {
        swal('Seu produto não foi deletado!', err, 'error')
      }
    }
  }

  /* Troca o condicional component, muda o id do produto para ser alterado e reseta alguns states */
  function handleChange(id) {
    setProductId(id)
    setProduto('')
    setDescricao('')
    setPreco('')
    showDiv ? setShowDiv(false) : setShowDiv(true) 
  }

  //Faz a alteração do produto
  async function handleUpdate(prod_id, name, description, price) {

    //As 3 variáveis abaixo receberão de uma que possui valor.
    //Por exemplo, se o nome do produto estiver em branco, ele preencherá com o valor vindo do banco
    const product_name = produto === '' ? name : produto
    const product_description = descricao === '' ? description : descricao
    const product_price = preco === '' ? price : preco

    const data = {
      product_name,
      product_description,
      product_price    
    }   
    
    try {
      await api.put(`produtos/${prod_id}`, data, {
        headers: {
          auth: id,
        }
      })

      alert('Produto alterado com sucesso!')
      handleChange()
    } catch(err) {
      alert('Erro ao alterar produto', err)
      handleChange()
    }    
  }

  const productsList = products.map(product => ((
    <li key={product._id}>
      <section>
        <img src={product.product_picture_url} alt="Foto do produto" />
      </section>
      <div>
        <p><strong>PRODUTO:</strong>{product.product_name}</p>

        <p><strong>DESCRIÇÃO:</strong> {product.product_description}</p>

        <p><strong>VALOR:</strong>R$ {product.product_price}</p>

        <button onClick={() => handleChange(product._id)} type="button" className="edit-button">
            <FaPen size={22} color="#FFF" />
        </button>
        <button onClick={() => handleDelete(product._id)} type="button" className="delete-button">
            <FaTrashAlt size={22} color="#FFF" />
        </button>
      </div>
    </li>
    )))

  if(!showDiv) {
    return(
      <>
        <div className="profile-container">  
          <Header />
          <div className="product-container">
          
            {!productsList.length ? 
            <div className="div-empty">
              <h1>Cadastre seu primeiro produto!</h1>
              <img src={emptyImage} alt="Nenhum produto cadastrado"/>
              <h2> Parece que você ainda não possui nenhum produto cadastrado :( </h2>
            </div> :
            <>
              <Link className="button" to='/perfil'>Produtos cadastrados</Link>
              <Link className="button" to='/avaliar'>Sugestões recebidas</Link>
              <ul> {productsList} </ul>
            </>
            }
          </div>
        </div>      
      </>
    )
  } else {
    return(
      <>
      <div className="profile-container">
        <Header />
        <div className="product-container">
          <Link className="button" to='/perfil'>Produtos cadastrados</Link>
          <Link className="button" to='/avaliar'>Sugestões recebidas</Link>
          <ul>
            {products.map(product => ((
              <li key={product._id}>
                <section>
                  <img src={product.product_picture_url} alt="Foto do produto" />
                </section>
                <div>
                  <p><strong>PRODUTO:</strong>{productId === product._id ?
                  <input type="text" defaultValue={product.product_name}
                  onChange={e => setProduto(e.target.value)}/> : product.product_name}</p>
                  

                  <p><strong>DESCRIÇÃO:</strong>{productId === product._id ?
                  <input type="text" defaultValue={product.product_description}
                  onChange={e => setDescricao(e.target.value)}/> : product.product_description}</p>
                  

                  <p><strong>VALOR:</strong>{productId === product._id ?
                  <input type="text" defaultValue={product.product_price}
                  onChange={e => setPreco(e.target.value)}/> : <>R$ {product.product_price}</>}</p>
                </div>
                {productId === product._id ?
                <button onClick={() => 
                handleUpdate(product._id, product.product_name, product.product_description, product.product_price)}
                type="button" id="confirm-button">
                  <FaSave size={20} color="#FFF" />
                </button> : null}
              </li>
            )))}
          </ul>
        </div>
      </div> 
      </>
    )
  }
}
