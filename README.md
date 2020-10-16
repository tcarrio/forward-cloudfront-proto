# forward-cloudfront-proto

When serving an Express server behind CloudFront, you might run into a case where your authentication cookies don't work and you want to blow your brains out because you have validated that everything is up to spec, and you've pored through MDN documentation, and you validated that you are setting cookies to secure for your new SameSite configuration but for the love of god it just won't work!

## That sounds like me so far, what now?

Well if you managed to find this package, you may be going through something that our team already encountered. If you happen to have an architecture diagram that is a superset of the following:

```

+-----+      +----------------+     +-------------+     +----------------+
| WWW | -->  | Cloudfront CDN | --> | API Gateway | --> | Express Server |
+-----+      +----------------+     +-------------+     +----------------+

```

you just might want to use this. Or write it yourself. It's a very simple package. At the very least, I may propogate some SEO hit on Google that will give you a solution to end your suffering.

## So what is this actually good for?

Cloudfront doesn't forward the original protocol using the standard `X-Forwarded-Proto` header. In fact, their forwarded protocol header needs to be enabled, and it's also a custom header called `Cloudfront-Fowarded-Proto`. So, make sure you update your Cloudfront configuration to forward this as well. You will need to include it in the whitelist for the request policy.

## Enough talking, what do I do?

This is designed as a simple Express middleware you can include in your application. If your app is sitting behind Cloudfront and you have some Express server initialized as `app` already, include the following:

```ts
import { forwardCloudfrontProto } from "@0xc/forward-cloudfront-proto";

// ...

app.use(forwardCloudfrontProto);
```

And you're done! Express will now handle requests as it would have expected, identifying HTTPS requests as secure, allowing use of SameSite in Chrome, and more.

## Many thanks to

Kindly, @beeme1mr, who did 99% of the work here to figure out the cause of the issue. I just packaged it for re-use.