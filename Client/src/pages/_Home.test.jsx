import { render, screen } from '@testing-library/react';
import Home from './Home';
import { expect,test } from 'vitest';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './Auth';
import Dashboard from './Dashboard';    
const router= createBrowserRouter([
    {
      path:"/auth",
      element:<Auth/>,
     },
    {
      path:"/",
      element:<Home/>,
     },
  {
    path:"/:id_pass",
    element:<Dashboard/>
  }
  ]
  )
const MockFunc=()=>{
  return <RouterProvider router={router}>
    <Home/>
    </RouterProvider>
}
test("Must Render texts" , async()=>{
   render(<MockFunc/>)
  const linkElement=screen.getByRole('button');
  const textElement=screen.getByText(/wanna share something/i);
    expect(linkElement,textElement).toBeInTheDocument();
})

test("Must Have alternative text for image" , async()=>{
  render(<MockFunc/>)
  const image = screen.getByAltText('chat image');
  expect(image).toBeInTheDocument();
})
test("Must Render Image" , async()=>{
    render(<MockFunc/>)
    const image = screen.getByAltText('chat image');
    expect(image.src).toContain('http://localhost:3000/src/assets/logo-notext.png');
  })

