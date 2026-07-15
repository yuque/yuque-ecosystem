import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Modules from './components/Modules/Modules'
import McpTools from './components/McpTools/McpTools'
import DesignPhilosophy from './components/DesignPhilosophy/DesignPhilosophy'
import Skills from './components/Skills/Skills'
import McpQuickStart from './components/McpQuickStart/McpQuickStart'
import PluginInstall from './components/PluginInstall/PluginInstall'
import Upgrade from './components/Upgrade/Upgrade'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Modules />
      <McpTools />
      <DesignPhilosophy />
      <Skills />
      <McpQuickStart />
      <PluginInstall />
      <Upgrade />
      <Footer />
    </>
  )
}

export default App
