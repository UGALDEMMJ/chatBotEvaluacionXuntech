import { useState, useRef, useEffect } from 'react'

function App() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "¡Hola! Soy el asistente virtual de XumTech. ¿En qué puedo ayudarte?", 
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatId, setChatId] = useState(null)
  const [chats, setChats] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    loadChats()
  }, [])

  const loadChats = async () => {
    try {
      const response = await fetch('https://localhost:3000/api/chat/user', {
        headers: { 'Authorization': 'Bearer supersecretkey' }
      })
      if (response.ok) {
        const chatsData = await response.json()
        setChats(chatsData)
      }
    } catch (error) {
      console.error('Error cargando chats:', error)
    }
  }
  
  const deleteChat = async (chatIdToDelete, e) => {
    e.stopPropagation()
    
    try {
      const response = await fetch(`https://localhost:3000/api/chat/${chatIdToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer supersecretkey' }
      })

      if (response.ok) {
        await loadChats()
        
        // Si era el chat activo y no quedan más chats, limpiar todo
        if (chatId === chatIdToDelete) {
          setChatId(null)
          setMessages([])
        }
      }
    } catch (error) {
      console.error('Error eliminando chat:', error)
    }
  }
  
  const createNewChat = async () => {
    try {
      const response = await fetch('https://localhost:3000/api/chat/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer supersecretkey',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user123',
          titulo: `Nuevo Chat ${new Date().toLocaleTimeString()}`
        })
      })

      if (response.ok) {
        const chat = await response.json()
        setChatId(chat._id)
        setChats(prev => [chat, ...prev])
        setMessages([{
          id: 1, 
          text: "¡Hola! Soy el asistente virtual de XumTech. ¿En qué puedo ayudarte?", 
          isBot: true,
          timestamp: new Date()
        }])
      }
    } catch (error) {
      console.error('Error creando chat:', error)
    }
  }

  const loadChat = async (selectedChatId) => {
    try {
      const response = await fetch(`https://localhost:3000/api/conversacion/conversaciones/${selectedChatId}`, {
        headers: { 'Authorization': 'Bearer supersecretkey' }
      })
      
      if (response.ok) {
        const conversaciones = await response.json()
        setChatId(selectedChatId)
        
        const chatMessages = conversaciones.map((conv) => ([
          {
            id: `${conv._id}-pregunta`,
            text: conv.pregunta,
            isBot: false,
            timestamp: new Date(conv.createdAt)
          },
          {
            id: `${conv._id}-respuesta`,
            text: conv.respuesta,
            isBot: true,
            timestamp: new Date(conv.createdAt)
          }
        ])).flat()

        if (chatMessages.length === 0) {
          setMessages([{
            id: 1, 
            text: "¡Hola! Soy el asistente virtual de XumTech. ¿En qué puedo ayudarte?", 
            isBot: true,
            timestamp: new Date()
          }])
        } else {
          setMessages(chatMessages)
        }
      }
    } catch (error) {
      console.error('Error cargando chat:', error)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !chatId) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('https://localhost:3000/api/preguntas/respuesta', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer supersecretkey',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatId: chatId,
          texto: inputMessage
        })
      })

      if (response.ok) {
        const data = await response.json()
        
        const botMessage = {
          id: Date.now() + 1,
          text: data.respuesta,
          isBot: true,
          timestamp: new Date()
        }

        setMessages(prev => [...prev, botMessage])
        loadChats()
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error)
      const errorMessage = {
        id: Date.now() + 1,
        text: "Lo siento, ha ocurrido un error. Por favor intenta nuevamente.",
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // ✅ Renderizado condicional basado en si hay chats
  if (chats.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-gray-900">
        {/* Pantalla completa centrada cuando no hay chats */}
        <div className="text-center p-8 max-w-lg">
          {/* Logo/Icono */}
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.02 9.02 0 01-5.618-1.896l-3.377.983a.5.5 0 01-.623-.627l.983-3.377A9.02 9.02 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          
          {/* Título */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            XumTech Assistant
          </h1>
          
          {/* Descripción */}
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            ¡Bienvenido! Crea tu primer chat para comenzar a conversar con nuestro asistente virtual inteligente.
          </p>
          
          {/* Botón crear primer chat */}
          <button
            onClick={createNewChat}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-3 mx-auto text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Crear mi primer chat</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-white text-gray-900">
      {/* Sidebar con chats */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* Botón nuevo chat */}
        <div className="p-3">
          <button
            onClick={createNewChat}
            className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors text-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm">Nuevo chat</span>
          </button>
        </div>

        {/* Lista de chats */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className={`group relative flex items-center rounded-lg text-sm hover:bg-gray-100 transition-colors text-gray-700 ${
                chatId === chat._id ? 'bg-blue-50 border border-blue-200' : ''
              }`}
            >
              <button
                onClick={() => loadChat(chat._id)}
                className="flex-1 text-left p-3 truncate"
              >
                {chat.titulo}
              </button>

              <button
                onClick={(e) => deleteChat(chat._id, e)}
                className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-2 mr-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200"
                title="Eliminar chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Área principal del chat */}
      <div className="flex-1 flex flex-col">
        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-6 border-b border-gray-100 ${
                message.isBot ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="max-w-3xl mx-auto flex space-x-4">
                <div className="flex-shrink-0">
                  {message.isBot ? (
                    <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-green-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">U</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 text-gray-800">
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="p-6 bg-gray-50 border-b border-gray-100">
              <div className="max-w-3xl mx-auto flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="w-full resize-none bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                rows="1"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute right-2 bottom-2 text-gray-400 hover:text-blue-600 disabled:text-gray-300 p-1 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App