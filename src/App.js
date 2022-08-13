import Layout from "./components/Layout";
import Form from "./components/form/Form";
import "./styles/index.scss";

function App() {
    return (
        <div className="App">
            <Layout>
                <h1>GOGO</h1>
                <Form />
            </Layout>
        </div>
    );
}

export default App;
