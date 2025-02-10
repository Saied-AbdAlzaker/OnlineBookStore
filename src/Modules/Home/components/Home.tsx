import Articles from "./Articles/Articles";
import Book from "./Book/Book";
import Categories from "./Categories/Categories";
import Feature from "./Feature/Feature";
import Newsletter from "./Newsletter/Newsletter";
import Release from "./Release/Release";

export default function Home() {
  return (
    <>
      <div className="container-fluid">
        <Book />
        <Categories />
        <Release />
        <Feature />
        <Newsletter />
        <Articles />
      </div>
    </>
  );
}
