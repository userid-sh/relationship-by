package relationshipby.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class DomainPropertyTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static DomainProperty getDomainPropertySample1() {
        return new DomainProperty().id(1L).name("name1");
    }

    public static DomainProperty getDomainPropertySample2() {
        return new DomainProperty().id(2L).name("name2");
    }

    public static DomainProperty getDomainPropertyRandomSampleGenerator() {
        return new DomainProperty().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
