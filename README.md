# E-Commerce App

Modern e-commerce platform built with React, TypeScript, Redux Saga, and Tailwind CSS.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Redux Toolkit** + **Redux Saga** (async)
- **React Router v7** (routing)
- **Tailwind CSS v4** (styling)
- **Axios** (HTTP)
- **i18next** (i18n)

## Quick Start

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # production build
pnpm preview  # preview build
```

## Features

- 🛍️ Product listing with filters (category, price, search)
- 🛒 Cart management (add, remove, update quantity)
- 💳 Checkout flow with payment
- 👤 Admin dashboard
- 📱 Responsive design
- 🔄 Async state via Redux Saga
- 🎯 Type-safe with TypeScript

## Architecture

Feature-based structure with centralized async logic:

```
UI → Redux → Saga → API → Redux → UI
```

### Folder Structure

```
src/
├── pages/           # Feature modules (products, cart, checkout, admin, payment)
│   └── [feature]/
│       ├── index.tsx
│       ├── components/
│       ├── views/
│       └── hooks/
├── store/           # Redux slices + sagas
│   ├── [feature]/
│   │   ├── index.ts    # slice
│   │   └── saga.ts     # async logic
│   └── store.ts
├── apis/            # HTTP services
├── components/      # Shared components
├── routes/          # Router config
├── hooks/           # Custom hooks
├── types/           # Global types
└── utils/           # Utilities
```

## Key Patterns

### Redux Slice

```ts
const slice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    fetchItems: () => {}, // saga trigger
  },
});
```

### Saga

```ts
function* OnFetchItems() {
  try {
    yield put(actions.setIsLoading(true));
    const data = yield call(getItems);
    yield put(actions.setItems(data));
  } catch (err) {
    // handle error
  } finally {
    yield put(actions.setIsLoading(false));
  }
}
```

### API

```ts
export const getItems = async (): Promise<Item[]> => {
  const response = await httpHandler(
    "items",
    RequestType.GET,
    headerWithAuth(),
  );
  if (response.status === responseStatus.SUCCESS) return response.data;
  throw new Error(response.message);
};
```

### Component

```ts
const Component: React.FC<Props> = ({ value }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(s => s.feature.items);

  useEffect(() => {
    dispatch(actions.fetchItems());
  }, []);

  return <div className="flex gap-4 p-4">{/* ... */}</div>;
};
```

## Styling

Tailwind inline classes for all UI. Use `classnames` for conditionals.

```tsx
<div className={classNames("p-4 rounded", isActive && "bg-blue-500")} />
```

## Rules

✅ Feature-based modules  
✅ Redux for server state  
✅ Saga for async  
✅ Tailwind for layout  
✅ Typed props/APIs  
✅ Error boundaries  
✅ Loading states

❌ No API in components  
❌ No thunks  
❌ No class components  
❌ No inline styles  
❌ No SCSS

## Scripts

```bash
pnpm dev      # dev server
pnpm build    # production build
pnpm preview  # preview build
pnpm lint     # ESLint
```
