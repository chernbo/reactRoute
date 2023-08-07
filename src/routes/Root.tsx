import { Form, Link, NavLink, Outlet, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { createContact, getContacts } from "../contacts";
import { useEffect } from "react";


export async function loader({ request }) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q')
  const contacts = await getContacts(query);
  return { contacts, query };
}
// 路由Form 提交，post 请求会 触发 action;
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {

  const { contacts, query } = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    document.getElementById("q").value = query;
  }, [query]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div >
          {/* 客户端路由提交此表单 */}
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={query}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/* <Link to={`contacts/${contact.id}`}

                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link> */}
                  <NavLink to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "isPending" : ""}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div >
      {/* 短暂延迟后添加一个漂亮的淡入淡出（以避免快速加载时闪烁 UI） */}
      <div id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        {/* 父级中，呈现子路由组件 */}
        <Outlet />
      </div>
    </>
  );
}
