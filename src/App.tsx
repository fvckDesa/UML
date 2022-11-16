import Class from "./components/Class";
import type { JavaClass } from "./types/class";

const Custom: JavaClass = {
  name: "test",
  attributes: [
    {
      name: "att1",
      type: "int",
      isArray: false,
      visibility: "public",
      isStatic: true,
    },
    {
      name: "att2",
      type: "float",
      isArray: true,
      visibility: "private",
      isStatic: false,
    },
    {
      name: "att3",
      type: "Custom",
      isArray: false,
      visibility: "package",
      isStatic: false,
    },
  ],
  methods: [
    {
      name: "method1",
      type: "int",
      isArray: false,
      visibility: "public",
      isStatic: true,
      parameters: [
        { name: "var1", type: "String", isArray: false },
        { name: "var2", type: "double", isArray: true },
      ],
    },
    {
      name: "method2",
      type: "String",
      isArray: true,
      visibility: "protected",
      isStatic: false,
      parameters: [],
    },
  ],
};

function App() {
  return (
    <div className="w-screen h-screen font-sans flex justify-center items-center">
      <Class javaClass={Custom} />
    </div>
  );
}

export default App;
