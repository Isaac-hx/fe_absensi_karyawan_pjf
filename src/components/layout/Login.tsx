import { Loader, Lock } from "lucide-react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import type { ILogin} from "@/types/type"
import {login} from "@/services/auth"
import { AppContext } from "../context/AppContext"


const Login = () => {
  const [formState, setFormState] = useState<ILogin>({ username: "", password: "" })
  const {setGlobalUser} = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormState(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    // this logic must be deleted - demo simulation
    // const tokenValue = "access"
    // document.cookie = `token=${tokenValue}; path=/; SameSite=Strict`
    // end
  
  

    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Authentication logic would go here
      const res = await login(formState)
      document.cookie = `token=${res.token}; path=/; SameSite=Strict`
      setGlobalUser({username:res.username})
      navigate("/dashboard-admin")
    } catch (err) {
      (err)
      setError("Invalid username or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <img src="./main_icon.png" width={200}/>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Dashboard Absensi
          </h2>
        </div>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <Input 
              id="username" 
              type="text"
              placeholder="Username"
              className="rounded-t-md rounded-b-none border-0 focus:ring-emerald-500 focus:border-emerald-500"
              required
              value={formState.username}
              onChange={handleChange}
            /> 
            <Input 
              id="password" 
              type="password"
              placeholder="Password"
              className="rounded-b-md rounded-t-none border-0 focus:ring-emerald-500 focus:border-emerald-500"
              required
              value={formState.password}
              onChange={handleChange}
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              {loading ? (
                <Loader className="animate-spin h-5 w-5 text-white" />
              ) : (
                <Lock className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" />
              )}
            </span>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;