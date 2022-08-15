import Layout from "./components/Layout";
import MainHeader from "./components/MainHeader";
import Form from "./components/form/Form";
import "./styles/index.scss";

function App() {
    return (
        <div className="App">
            <Layout>
                <MainHeader />
                <Form />
            </Layout>
        </div>
    );
}

export default App;
