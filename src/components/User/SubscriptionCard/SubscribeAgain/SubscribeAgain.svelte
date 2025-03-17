<script>
  import { _user } from "$lib";
  import Swal from "sweetalert2";
  let isOpeningPortal = false;
  import { PUBLIC_API } from "$lib/env.js";

  import {
    PUBLIC_APP,
    PUBLIC_STRIPE_PRICE_YEARLY,
    PUBLIC_STRIPE_PRICE_MONTHLY,
  } from "$lib/env.js";

  async function click() {
    const plan = await getPlan();
    initiateCheckout({ email: $_user.email, plan });
  }
  async function getPlan(email) {
    const result = await Swal.fire({
      title: "Choose Subscription",
      text: " You won't be billed if you cancel during in the first week.",
      showCancelButton: false,
      confirmButtonText: "Monthly $9/mo",
      confirmButtonColor: "#2e2f33",

      showDenyButton: true,
      denyButtonText: `Yearly $89/yr`,

      denyButtonColor: "#f74d4d",
    });
    if (result.isDenied) return "yearly";
    if (result.isConfirmed) return "monthly";
  }

  async function initiateCheckout({ email, plan }) {
    const customerId = $_user.customerId;
    let priceId;

    if (plan == "yearly") priceId = PUBLIC_STRIPE_PRICE_YEARLY;
    if (plan == "monthly") priceId = PUBLIC_STRIPE_PRICE_MONTHLY;

    try {
      const returnUrl = PUBLIC_APP;

      const response = await fetch(
        PUBLIC_API + "/api/stripe/createCheckoutSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priceId, email, returnUrl, customerId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const session = await response.json();

      // Redirect to Checkout.
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  }
</script>

<button on:click={click} class="w-100 btn-sm btn btn-success mt-2">
  {#if isOpeningPortal}
    <span
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
  {:else}
    Subscribe Again
  {/if}
</button>

<style>
  .spinner-border {
    opacity: 0.5;
  }
  /* 
	.btn-warning {
		background: rgba(185, 185, 45, 0.427);
	}
	.btn-warning:hover {
		background: rgba(185, 185, 45, 0.61);
	} */
</style>
