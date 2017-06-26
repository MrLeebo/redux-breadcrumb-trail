# Using the Component Cache to keep non-serializable data out of your redux store

It is a best practice for redux states to consist of serializable values. In **redux-breadcrumb-trail**, breadcrumbs can be functions or dynamic components. If you would like to have dynamic breadcrumbs in your application, but you also want your redux state to be serializable, you can use the component cache.

Let's say you have the following route:

```
<Route path="friends/:id" component={Friends} breadcrumb={FriendsBreadcrumb} />
```

The `breadcrumb` prop is a React component and is not serializable. To resolve this issue, import the component cache and give your component a serializable name.

```
import { componentCache } from 'redux-breadcrumb-trail'

componentCache.set('friend', FriendsBreadcrumb) 
```

Then, in your Route you can use a component cache entry object to describe your component in a serializer-friendly way.

```
<Route path="friends/:id" component={Friends} breadcrumb={{ componentCacheKey: "friend" }} />
```
